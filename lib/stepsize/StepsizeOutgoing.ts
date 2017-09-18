'use babel';

import { Socket, createSocket } from 'dgram';
import fs from 'fs';
import StepsizeHelper from './StepsizeHelper';

class StepsizeOutgoing {
  private pluginId;
  private DEBUG: boolean;
  private UDP_HOST: string;
  private UDP_PORT: number;
  private OUTGOING_SOCK: Socket;

  constructor() {
    this.pluginId = 'atom_v0.0.2';
    this.DEBUG = false;
    this.UDP_HOST = '127.0.0.1';
    this.UDP_PORT = 49369;
    this.OUTGOING_SOCK = createSocket('udp4');
  }

  public send(event, callback?) {
    let msg = JSON.stringify(event);
    this.OUTGOING_SOCK.send(
      msg,
      0,
      msg.length,
      this.UDP_PORT,
      this.UDP_HOST,
      callback
    );
  }

  // sendError - sends error message to Stepsize
  sendError = data => {
    let editor = atom.workspace.getActiveTextEditor();
    if (!editor) {
      return;
    }
    let event = {
      source: 'atom',
      action: 'error',
      filename: fs.realpathSync(editor.getPath()),
      selected: JSON.stringify(data),
      plugin_id: this.pluginId,
    };
    this.send(event);
  };

  buildSelectionEvent(editor) {
    const ranges = editor.selections.map(selection => {
      return selection.getBufferRange();
    });
    return this.buildEvent(editor, ranges, 'selection');
  }

  buildEvent(editor, ranges, action, forRenderer = true) {
    const text = editor.getText();

    const selectedLineNumbers = StepsizeHelper.rangesToSelectedLineNumbers(
      ranges
    );

    return {
      source: 'atom',
      action: action,
      filename: editor.getPath() || null,
      plugin_id: this.pluginId,
      selectedLineNumbers,
      forRenderer: forRenderer,
    };
  }
}

export default StepsizeOutgoing;