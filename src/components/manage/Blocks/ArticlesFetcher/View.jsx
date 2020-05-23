/**
 * Edit map block.
 * @module components/manage/Blocks/Maps/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import _ from 'lodash'

class View extends Component {
    /**
     * Property types.
     * @property {Object} propTypes Property types.
     * @static
     */
    static propTypes = {
        data: PropTypes.objectOf(PropTypes.any).isRequired,
        // pathname: PropTypes.string.isRequired,
    };

    render() {

        return (
            <div style={{marginBottom:"40px",marginTop:"40px"}}>
            <Grid columns={1}>
                fetcher view
            </Grid>
            </div>
        );
    }
}

export default injectIntl(View);
