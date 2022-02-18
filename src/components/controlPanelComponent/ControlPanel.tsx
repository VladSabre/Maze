import React from 'react';
import './ControlPanel.scss';

namespace ControlPanelComponent {
    export interface Props {
        resetLevel: () => void;
    }
}

export default class ControlPanel extends React.Component<ControlPanelComponent.Props> {
    public render(): JSX.Element {
        return (
            <div className="control-panel">
                <button
                    className="control-panel_button"
                    onClick={this.props.resetLevel}
                >
                    Reset
                </button>
            </div>
        );
    }
}