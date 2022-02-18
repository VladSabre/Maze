import React from 'react';
import BoardHeader from '../boardHeaderComponent/BoardHeader';
import Maze from '../mazeComponent/Maze';
import Overlay from '../overlayComponent/Overlay';
import './Board.scss';

namespace BoardComponent {
    export interface Props {
        maxLevel: number;
    }
    export interface State {
        score: number;
        time: number;
        isFinished: boolean;
        level: number;
        isPaused: boolean;
        intervalId: ReturnType<typeof setTimeout>;
    }
}

export default class Board extends React.Component<
    BoardComponent.Props,
    BoardComponent.State
> {
    constructor(props: BoardComponent.Props) {
        super(props);
        this.state = {
            score: 0,
            time: 0,
            isFinished: false,
            level: 1,
            isPaused: true,
            intervalId: (null as unknown) as ReturnType<typeof setTimeout>
        };

        this.onScoreChange = this.onScoreChange.bind(this);
        this.onLevelFinish = this.onLevelFinish.bind(this);
        this.onStart = this.onStart.bind(this);
        this.onPause = this.onPause.bind(this);
    }

    private mazeRef = React.createRef<Maze>();

    private loadNextLevel() {
        this.setState({
            level: this.props.maxLevel > this.state.level ? this.state.level + 1 : 1
        });
        this.resetLevel();
    }

    private onScoreChange() {
        this.setState({ score: this.state.score + 1 });
    }

    private onLevelFinish() {
        clearInterval(this.state.intervalId);
        this.setState({ isFinished: true });
        setTimeout(() => {
            this.loadNextLevel();
        }, 2000);
    }

    private onStart() {
        this.setState({ isPaused: false });
        if (this.state.isFinished) return;

        const startTime = Date.now() - 1000 * this.state.time;
        const intervalId = setInterval(() => {
            const delta = Date.now() - startTime;
            this.setState({ time: Math.floor(delta / 1000) });
        }, 200);
        this.setState({ intervalId: intervalId });
    }

    private onPause() {
        this.setState({ isPaused: true });
        clearInterval(this.state.intervalId);
    }

    public resetLevel() {
        this.setState({
            score: 0,
            time: 0,
            isFinished: false,
            isPaused: true
        });
        this.mazeRef.current!.resetPosition();
    }

    public render(): JSX.Element {
        return (
            <div className="board">
                <BoardHeader
                    score={this.state.score}
                    time={this.state.time}
                    level={this.state.level}
                    showCongratulation={this.state.isFinished}
                />
                {this.state.isPaused && (
                    <Overlay
                        onClick={this.onStart}
                        hasGameStared={this.state.score > 0}
                    />
                )}
                <Maze
                    level={this.state.level}
                    onScoreChange={this.onScoreChange}
                    onLevelFinish={this.onLevelFinish}
                    onPause={this.onPause}
                    isPaused={this.state.isPaused}
                    isFinished={this.state.isFinished}
                    ref={this.mazeRef}
                />
            </div>
        );
    }
}
