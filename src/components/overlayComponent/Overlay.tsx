import React from 'react';

namespace OverlayComponent {
    export interface Props {
        hasGameStared: boolean;
        onClick: () => void;
    }
}

export default class Overlay extends React.Component<OverlayComponent.Props> {
    public render(): JSX.Element {
        return (
            <div className="maze_overlay" onClick={this.props.onClick}>
                <span className="maze_overlay-label" onClick={this.props.onClick}>
                    {this.props.hasGameStared ? "Continue" : "Play"}
                </span>
            </div>
        );
    }
}
