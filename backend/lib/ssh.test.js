const { SSHConnection } = require('./ssh');

describe('SSHConnection', () => {
  let socket;
  let sshConnection;

  beforeEach(() => {
    socket = {
      on: jest.fn(),
      emit: jest.fn(),
    };
    sshConnection = new SSHConnection(socket);
  });

  it('should listen for socket events on construction', () => {
    expect(socket.on).toHaveBeenCalledWith('ssh:connect', expect.any(Function));
    expect(socket.on).toHaveBeenCalledWith('ssh:command', expect.any(Function));
    expect(socket.on).toHaveBeenCalledWith('disconnect', expect.any(Function));
  });

  it('should emit ssh:connected on successful connection', async () => {
    sshConnection.ssh.connect = jest.fn().mockResolvedValue();
    sshConnection.ssh.requestShell = jest.fn().mockResolvedValue({
      on: jest.fn(),
      write: jest.fn(),
    });

    await sshConnection.connect({});

    expect(socket.emit).toHaveBeenCalledWith('ssh:connected');
  });

  it('should emit ssh:error on failed connection', async () => {
    const errorMessage = 'Connection failed';
    sshConnection.ssh.connect = jest.fn().mockRejectedValue(new Error(errorMessage));

    await sshConnection.connect({});

    expect(socket.emit).toHaveBeenCalledWith('ssh:error', errorMessage);
  });

  it('should write command to shell', async () => {
    const shell = {
      on: jest.fn(),
      write: jest.fn(),
    };
    sshConnection.ssh.connect = jest.fn().mockResolvedValue();
    sshConnection.ssh.requestShell = jest.fn().mockResolvedValue(shell);

    await sshConnection.connect({});
    sshConnection.runCommand('ls');

    expect(shell.write).toHaveBeenCalledWith('ls\n');
  });

  it('should dispose ssh connection on disconnect', () => {
    sshConnection.ssh.isConnected = jest.fn().mockReturnValue(true);
    sshConnection.ssh.dispose = jest.fn();

    sshConnection.disconnect();

    expect(sshConnection.ssh.dispose).toHaveBeenCalled();
    expect(socket.emit).toHaveBeenCalledWith('ssh:disconnected');
  });
});
