// spacegraph.tsx
import * as React from 'react';
// import FloatingActionButton from 'material-ui/FloatingActionButton';
// import ContentAdd from 'material-ui/svg-icons/content/add';
import { styles as globalstyles } from '../utilities/styles';
import { range } from "lodash";
import { forceLink, forceManyBody, forceX, forceY } from "d3-force";
import VictoryForce from '../forks/victory-force';
class NodeComponent extends React.Component {
    render() {
        let x = this.props.x;
        let y = this.props.y;
        let index = this.props.index;
        let component;
        if ((index % 2) == 0) {
            component = <svg x={x - (53.6 / 2)} y={y - (65.13 / 2)} viewBox="0 0 15000 15000" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path d="M 49 392.769 L 49.048 392.769 C 51.423 423.069 140.438 447.428 249.899 447.428 C 359.36 447.428 448.375 423.069 450.75 392.769 L 451.001 392.769 L 451.001 437.281 L 450.736 437.281 C 450.778 437.751 450.799 438.222 450.799 438.694 C 450.799 469.568 360.853 494.596 249.899 494.596 C 138.945 494.596 48.999 469.568 48.999 438.694 C 48.999 438.222 49.02 437.751 49.062 437.281 L 49 437.281 Z"/>
      <ellipse style={{ fill: "rgb(216, 216, 216)" }} cx="250" cy="393.486" rx="200.9" ry="55.902"/>
    </g>
    <g transform="matrix(1, 0, 0, 1, 0, 133.561798)">
      <path d="M 259.799 148.497 L 259.802 148.497 L 259.802 251.376 L 259.796 251.376 C 259.745 252.977 255.378 254.271 249.997 254.271 C 244.585 254.271 240.198 252.962 240.198 251.348 C 240.198 251.308 240.201 251.268 240.206 251.229 L 240.206 148.614 C 240.373 150.185 244.694 151.443 250 151.443 C 255.412 151.443 259.799 150.134 259.799 148.52 C 259.799 148.512 259.799 148.505 259.799 148.497 Z"/>
      <ellipse style={{ fill: "rgb(216, 216, 216)" }} cx="250" cy="148.52" rx="9.799" ry="2.923"/>
    </g>
    <g transform="matrix(1.233934, 0, 0, 1, -59.793827, 0)">
      <ellipse cx="250" cy="183.491" rx="177.358" ry="177.358" style={{ fill: "rgb(158, 158, 158)" }}/>
      <ellipse cx="250" cy="183.491" rx="167.126" ry="167.125" style={{ fill: "rgb(216, 216, 216)" }}/>
    </g>
  </svg>;
        }
        else {
            component = <svg x={x - (53.6 / 2)} y={y - (65.13 / 2)} viewBox="0 0 15000 15000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="pattern-0" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" viewBox="0 0 100 100">
      <path d="M 0 0 L 50 0 L 50 100 L 0 100 Z" style={{ fill: "black" }}/>
    </pattern>
  </defs>
  <rect x="25.05" y="626.004" width="402" height="43.783" transform="matrix(1, 0, 0, 1.000001, 0, -175.373148)"/>
  <path d="M 478.068 370.062 L 426.565 453.202 L 426.772 493.231 L 477.208 410.939 L 478.068 370.062 Z" style={{ stroke: "black", fill: "rgb(132, 132, 132)" }}/>
  <path d="M 93.498 368.813 L 25.683 452.844 L 427.053 453.109 L 478.046 369.005 L 93.498 368.813 Z" style={{ stroke: "black", fill: "rgb(216, 216, 216)" }}/>
  <g transform="matrix(1, 0, 0, 1, 7.129097, 157.745102)">
    <path d="M 259.799 148.497 L 259.802 148.497 L 259.802 251.376 L 259.796 251.376 C 259.745 252.977 255.378 254.271 249.997 254.271 C 244.585 254.271 240.198 252.962 240.198 251.348 C 240.198 251.308 240.201 251.268 240.206 251.229 L 240.206 148.614 C 240.373 150.185 244.694 151.443 250 151.443 C 255.412 151.443 259.799 150.134 259.799 148.52 C 259.799 148.512 259.799 148.505 259.799 148.497 Z"/>
    <ellipse style={{ fill: "rgb(216, 216, 216)" }} cx="250" cy="148.52" rx="9.799" ry="2.923"/>
  </g>
  <g transform="matrix(1.157577, 0, 0, 1.087123, -29.310127, -33.252464)">
    <rect x="45.928" y="43.867" width="400.223" height="337.804" style={{ fill: "rgb(158, 158, 158)" }}/>
    <rect style={{ fill: "rgb(216, 216, 216)" }} x="57.861" y="57.636" width="375.104" height="311.184"/>
  </g>
</svg>;
        }
        return component;
    }
}
// ================
const nodes = range(100).map((i) => {
    return {
        index: i,
    };
});
const links = range(nodes.length - 1).map((i) => {
    return {
        source: Math.floor(Math.sqrt(i)),
        target: i + 1
    };
});
class SpaceGraph extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            nodes,
            links,
        };
        this.styles = JSON.parse(JSON.stringify(globalstyles.spacegraph));
        this.stylesmemo = {
            overflow: null
        };
        this.frameElement = null;
        this.onStartSplitterDrag = () => {
            // console.log('running onStartSplitterDrag')
            this.stylesmemo.overflow = this.frameElement.style.overflow;
            this.frameElement.style.overflow = 'hidden';
            // styles.frame.overflow = 'hidden'
            // this.forceUpdate()
        };
        this.onEndSplitterDrag = () => {
            this.frameElement.style.overflow = this.stylesmemo.overflow;
            // styles.frame.overflow = this.stylesmemo.overflow
            this.stylesmemo.overflow = null;
            // this.forceUpdate()
        };
    }
    componentWillMount() {
        if (this.props.getTriggers) {
            let triggers = {};
            for (let trigger of this.props.triggers) {
                if (this[trigger]) {
                    triggers[trigger] = this[trigger];
                }
            }
            this.props.getTriggers(this.props.paneid, triggers);
        }
    }
    removeNode(datum) {
        const { nodes, links } = this.state;
        this.setState({
            nodes: nodes.filter((node) => node.index !== datum.index),
            links: links.filter(({ source, target }) => {
                return source.index !== datum.index && target.index !== datum.index;
            })
        });
    }
    render() {
        const containerStyle = {};
        const parentStyle = {
            backgroundColor: "#f7f7f7",
            maxWidth: 5000,
            maxHeight: 5000
        };
        let styles = this.styles;
        let frame = Object.assign({}, styles.frame);
        // console.log('spacegraph styles',styles)
        return <div style={styles.fixedframe}>
            <div style={styles.originframe}>
                <div style={styles.origin}>
                    Origin
                </div>
            </div>
            <div ref={(node) => {
            this.frameElement = node;
        }} style={frame}>
              <VictoryForce nodes={this.state.nodes} links={this.state.links} height={2000} width={2000} forces={{
            charge: forceManyBody(),
            link: forceLink(this.state.links).distance(72).strength(1),
            x: forceX(),
            y: forceY()
        }} style={{
            parent: parentStyle,
            links: {
                stroke: "rgba(0, 0, 0, 0.2)",
                strokeWidth: 1
            }
        }} size={72} nodeComponent={<NodeComponent />} events={[
            {
                target: "data",
                eventHandlers: {
                    onClick: (e, { datum }) => {
                        this.removeNode(datum);
                    }
                }
            }
        ]}/>
            </div>
        </div>;
    }
}
export default SpaceGraph;
//# sourceMappingURL=spacegraph.jsx.map