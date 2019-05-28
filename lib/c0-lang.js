'use babel';

import C0LangView from './c0-lang-view';
import { CompositeDisposable } from 'atom';

export default {

  c0LangView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.c0LangView = new C0LangView(state.c0LangViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.c0LangView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'c0-lang:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.c0LangView.destroy();
  },

  serialize() {
    return {
      c0LangViewState: this.c0LangView.serialize()
    };
  },

  toggle() {
    console.log('C0Lang was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
