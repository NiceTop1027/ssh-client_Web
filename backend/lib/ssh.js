const { NodeSSH } = require('node-ssh');
const { readData, addSshConnection } = require('../utils/db'); // Updated import

class SSHConnection {
  constructor(socket) {
    this.socket = socket;
    this.ssh = new NodeSSH();
    this.shell = null;

    this.socket.on('ssh:connect', (options) => this.connect(options));
    this.socket.on('ssh:command', (command) => this.runCommand(command));
    this.socket.on('disconnect', () => this.disconnect());
    this.socket.on('ssh:getConnections', () => this.getConnections());
  }

  async getConnections() { // Made async
    try {
      const { sshConnections } = await readData(); // Use await
      this.socket.emit('ssh:connectionsList', sshConnections);
    } catch (error) {
      console.error("Error fetching SSH connections for socket:", error);
      this.socket.emit('ssh:error', "Error fetching saved connections.");
    }
  }

  async connect(options) {
    try {
      let connectionOptions = { ...options };
      if (options.id) {
        const { sshConnections } = await readData(); // Use await
        const savedConnection = sshConnections.find(conn => conn.id === options.id);
        if (savedConnection) {
          // Merge saved options with new options (new options can override or add sensitive info)
          connectionOptions = { ...savedConnection, ...options };
          console.log('Reconnecting with saved options:', connectionOptions);
        } else {
          throw new Error('Saved connection not found.');
        }
      }
      console.log('Attempting SSH connection with options:', connectionOptions);
      await this.ssh.connect(connectionOptions);
      this.shell = await this.ssh.requestShell();
      this.socket.emit('ssh:connected');

      // --- NEW CODE START ---
      // Save connection details after successful connection
      await this.saveConnectionDetails(options); // Use await
      // --- NEW CODE END ---

      this.shell.on('data', (data) => {
        this.socket.emit('ssh:data', data.toString());
      });

      this.shell.on('close', () => {
        this.disconnect();
      });
    } catch (error) {
      console.error('SSH connection error details:', error);
      this.socket.emit('ssh:error', error.message);
    }
  }

  // --- NEW FUNCTION START ---
  async saveConnectionDetails(options) { // Made async
    const { host, port, username, name } = options; // Extract non-sensitive details
    const { sshConnections } = await readData(); // Use await
    const newConnection = {
      // Firestore will assign ID, so we don't need to generate here
      name: name || `${username}@${host}:${port || 22}`,
      host,
      port: port || 22,
      username,
      // IMPORTANT: Do NOT save sensitive info like password or privateKey
    };
    // Check if connection already exists to avoid duplicates
    const exists = sshConnections.some(conn =>
      conn.host === newConnection.host &&
      conn.port === newConnection.port &&
      conn.username === newConnection.username
    );

    if (!exists) {
      await addSshConnection(newConnection); // Use addSshConnection
      console.log('SSH connection details saved:', newConnection); // For debugging
    } else {
      console.log('SSH connection details already exist, not saving duplicate.');
    }
  }
  // --- NEW FUNCTION END ---

  runCommand(command) {
    if (this.shell) {
      this.shell.write(command);
    }
  }

  disconnect() {
    if (this.ssh.isConnected()) {
      this.ssh.dispose();
    }
    this.socket.emit('ssh:disconnected');
  }
}

module.exports = { SSHConnection };