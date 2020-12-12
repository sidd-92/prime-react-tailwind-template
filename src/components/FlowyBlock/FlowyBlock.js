import React from "react";
import grabme from "../../assets/img/grabme.svg";
class FlowyBlock extends React.Component {
  render() {
    return (
      <div class="blockelem create-flowy noselect">
        <input type="hidden" name="blockelemtype" class="blockelemtype" value={this.props.value} />
        <div class="grabme">
          <img src={grabme} />
        </div>
        <div class="blockin">
          <div class="blockico">
            <span></span>
            <img src={this.props.blockIcon} />
          </div>
          <div class="blocktext">
            <p class="blocktitle">{this.props.blockTitle}</p>
            <p class="blockdesc">{this.props.blockDesc}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default FlowyBlock;
