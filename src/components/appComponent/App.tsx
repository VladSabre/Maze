import React from 'react';
import ControlPanel from '../controlPanelComponent/ControlPanel';
import Board from '../boardComponent/Board';
import './App.scss';

export default class App extends React.Component {
    private boardRef = React.createRef<Board>();
    private resetLevel = () => this.boardRef.current!.resetLevel();

    public render(): JSX.Element {
        return (
            <div className="app">
                <Board ref={this.boardRef} maxLevel={2} />
                <ControlPanel resetLevel={this.resetLevel} />
            </div>
        );
    }
}








