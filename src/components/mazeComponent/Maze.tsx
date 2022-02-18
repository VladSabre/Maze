import React from 'react';
import ReactDOM from 'react-dom';
import MazeLevelGenerator from '../../services/generatorService';
import Mapper from '../../services/mapper';
import { ShakeDirection } from '../../types/shakeDIrection';
import { Tile } from '../tileComponent/Tile';
import './Maze.scss';

namespace MazeComponent {
    export interface Props {
        level: number;
        isPaused: boolean;
        isFinished: boolean;
        onScoreChange: () => void;
        onPause: () => void;
        onLevelFinish: () => void;
    }
    export interface State {
        playerPositionX: number;
        playerPositionY: number;
    }
}

export default class Maze extends React.Component<MazeComponent.Props, MazeComponent.State> {
    constructor(props: MazeComponent.Props) {
        super(props);
        this.state = {
            playerPositionX: this.getStartPosition().x,
            playerPositionY: this.getStartPosition().y
        };
        this.keyPressHandler = this.keyPressHandler.bind(this);
    }

    public resetPosition() {
        this.setState({
            playerPositionX: this.getStartPosition().x,
            playerPositionY: this.getStartPosition().y
        });
    }

    private playerTileRef: Tile | null = null;

    private getTileMap = () => MazeLevelGenerator.getLevel(this.props.level);
    private getStartPosition = () =>
        MazeLevelGenerator.getStartPosition(this.props.level);

    private getCurrentCell = () =>
        Mapper.mapType(
            this.getTileMap()[this.state.playerPositionY][this.state.playerPositionX]
        );

    private canGoUp = () =>
        this.state.playerPositionY > 0 && this.getCurrentCell().north;
    private canGoDown = () =>
        this.state.playerPositionY < this.getTileMap().length - 1 &&
        this.getCurrentCell().south;
    private canGoLeft = () =>
        this.state.playerPositionX > 0 && this.getCurrentCell().west;
    private canGoRight = () =>
        this.state.playerPositionX < this.getTileMap().length - 1 &&
        this.getCurrentCell().east;

    private isFinish = (locationX: number, locationY: number) =>
        locationX === 0 && locationY === 0;

    private checkIfLevelFinished = () => {
        if (this.isFinish(this.state.playerPositionX, this.state.playerPositionY))
            this.props.onLevelFinish();
    };

    private handleClosedWay(direction: ShakeDirection) {
        this.playerTileRef!.handleClosedWay(direction);
    }

    private keyPressHandler(event: React.KeyboardEvent<HTMLInputElement>) {
        if (this.isFinish(this.state.playerPositionX, this.state.playerPositionY))
            return;
        switch (event.code) {
            case "ArrowUp":
                if (this.canGoUp()) {
                    this.setState(
                        { playerPositionY: this.state.playerPositionY - 1 },
                        this.checkIfLevelFinished
                    );
                    this.props.onScoreChange();
                } else {
                    this.handleClosedWay(ShakeDirection.Vertically);
                }
                break;
            case "ArrowDown":
                if (this.canGoDown()) {
                    this.setState(
                        { playerPositionY: this.state.playerPositionY + 1 },
                        this.checkIfLevelFinished
                    );
                    this.props.onScoreChange();
                } else {
                    this.handleClosedWay(ShakeDirection.Vertically);
                }
                break;
            case "ArrowLeft":
                if (this.canGoLeft()) {
                    this.setState(
                        { playerPositionX: this.state.playerPositionX - 1 },
                        this.checkIfLevelFinished
                    );
                    this.props.onScoreChange();
                } else {
                    this.handleClosedWay(ShakeDirection.Horizontally);
                }
                break;
            case "ArrowRight":
                if (this.canGoRight()) {
                    this.setState(
                        { playerPositionX: this.state.playerPositionX + 1 },
                        this.checkIfLevelFinished
                    );
                    this.props.onScoreChange();
                } else {
                    this.handleClosedWay(ShakeDirection.Horizontally);
                }
                break;
        }
    }

    public componentDidUpdate(
        prevProps: MazeComponent.Props,
        prevState: MazeComponent.State
    ): void {
        if (!this.props.isPaused) (ReactDOM!.findDOMNode(this.refs.maze) as HTMLElement).focus();
    }

    public render(): JSX.Element {
        const hasPlayer = (index: number, rowIndex: number) =>
            this.state.playerPositionX == index &&
            this.state.playerPositionY == rowIndex;

        return (
            <div
                className="maze"
                onKeyDown={this.keyPressHandler}
                tabIndex={0}
                onBlur={this.props.onPause}
                ref="maze"
            >
                {this.getTileMap().map((row, rowIndex) => (
                    <div className="maze_row">
                        {row.map((tile, index) => (
                            <Tile
                                key={100 * rowIndex + index}
                                type={tile}
                                isFinish={this.isFinish(rowIndex, index)}
                                hasPlayer={hasPlayer(index, rowIndex)}
                                forceEmptyTrail={
                                    this.state.playerPositionX == this.getStartPosition().x &&
                                    this.state.playerPositionY == this.getStartPosition().y
                                }
                                isFinished={this.props.isFinished}
                                ref={(node: Tile | null) =>
                                    hasPlayer(index, rowIndex)
                                        ? (this.playerTileRef = node)
                                        : null
                                }
                            />
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}