import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import articles from './articles.json';
import { Grid, Pagination } from 'semantic-ui-react';
import Article from './Article';

const items = articles.items;

class Edit extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    block: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    pathname: PropTypes.string.isRequired,
    onChangeBlock: PropTypes.func.isRequired,
    onSelectBlock: PropTypes.func.isRequired,
    onDeleteBlock: PropTypes.func.isRequired,
    onFocusPreviousBlock: PropTypes.func.isRequired,
    onFocusNextBlock: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      list: items,
    };
  }

  componentDidMount() {
    this.onChangeData();
  }

  onChangeData() {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      list: this.state.list,
    });
  }
  render() {
    return (
      <Grid columns={1}>
        <Grid.Column>
          {items &&
            items.map(item => (
              <Article
                img={item.url}
                title={item.title}
                date={item.date}
                description={item.description}
                url={item.url}
              />
            ))}
        </Grid.Column>
      </Grid>
    );
  }
}

export default injectIntl(Edit);
