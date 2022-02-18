import React from 'react';
import Mapper from '../../services/mapper';
import Player from '../playerComponent/Player';
import { ShakeDirection } from '../../types/shakeDIrection';
import { Trail } from '../trailComponent/Trail';
import './Tile.scss';

namespace TileComponent {
    export interface Props {
        type: number;
        hasPlayer: boolean;
        isFinish: boolean;
        forceEmptyTrail: boolean;
        isFinished: boolean;
    }
    export interface State {
        hasTrail: boolean;
    }
}

export class Tile extends React.Component<TileComponent.Props, TileComponent.State> {
    constructor(props: TileComponent.Props) {
        super(props);
        this.state = {
            hasTrail: false
        };
    }

    private playerRef = React.createRef<Player>();

    public handleClosedWay(direction: ShakeDirection) {
        this.playerRef.current!.handleClosedWay(direction);
    }

    public static getDerivedStateFromProps(
        props: TileComponent.Props,
        state: TileComponent.State
    ) {
        if (props.hasPlayer) return { hasTrail: true };
        else if (props.forceEmptyTrail) return { hasTrail: false };
    }

    public render(): JSX.Element {
        const isPassageOpen = Mapper.mapType(this.props.type);
        const NClass = !isPassageOpen.north ? "tile__wall-north" : "";
        const EClass = !isPassageOpen.east ? "tile__wall-east" : "";
        const SClass = !isPassageOpen.south ? "tile__wall-south" : "";
        const WClass = !isPassageOpen.west ? "tile__wall-west" : "";
        const finishClass = this.props.isFinish ? "tile__finish" : "";

        const className = `tile ${finishClass} ${NClass} ${EClass} ${SClass} ${WClass}`;

        return (
            <div className="tile-container">
                <div className={className}>
                    {!this.props.hasPlayer && this.state.hasTrail && (
                        <Trail shouldPulse={this.props.isFinished} />
                    )}
                    {this.props.hasPlayer && <Player ref={this.playerRef} />}
                </div>
            </div>
        );
    }
}