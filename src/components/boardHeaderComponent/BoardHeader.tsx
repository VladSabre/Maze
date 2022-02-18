import React from 'react';

namespace BoardHeaderComponent {
    export interface Props {
        score: number;
        time: number;
        level: number;
        showCongratulation: boolean;
    }
}

export default class BoardHeader extends React.Component<BoardHeaderComponent.Props> {
    public render(): JSX.Element {
        const score = this.props.score.toString().padStart(3, "0");
        const time = new Date(this.props.time * 1000).toISOString().substr(14, 5);
        const levelLabel = `Level ${this.props.level}`;
        const baseClass = "board-header";
        const scoreClass = `${baseClass}_score`;
        const timesClass = `${baseClass}_timer`;

        return (
            <div className={baseClass}>
                <div className={scoreClass}>{score}</div>
                <div className="header">
                    {this.props.showCongratulation ? "Well done!" : levelLabel}
                </div>
                <div className={timesClass}>{time}</div>
            </div>
        );
    }
}
