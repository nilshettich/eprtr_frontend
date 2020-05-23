import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import AddLinkForm from '../DetailedLink/AddLinkForm';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getParentFolderData } from '~/actions';
import { Link } from 'react-router-dom';
import _ from 'lodash'


const SparqlClient = require('sparql-http-client')

//https://cors-anywhere.herokuapp.com/http://example.com

const endpointUrl = 'https://cors-anywhere.herokuapp.com/http://semantic.eea.europa.eu/sparql'
const query = `PREFIX eea: <http://www.eea.europa.eu/ontologies.rdf#>
PREFIX amp:<http://rdfdata.eionet.europa.eu/amp/ontology/> 
PREFIX prod: <http://www.eea.europa.eu/portal_types/Article#>
PREFIX dc: <http://purl.org/dc/terms/>
PREFIX schema: <http://schema.org/>

SELECT DISTINCT 
?subject as ?uri
?title
?created
?modified
?published
lang(?title) as ?language
?translation_of_uri
?mps_code
?serial_title
?description
?type_uri
?isbn
?prod_id
WHERE {
  ?subject a prod:Article .
  ?subject dc:title ?title .
  ?subject dc:created ?created .
  ?subject dc:modified ?modified .
  ?subject dc:issued ?published .
  OPTIONAL { ?subject eea:isTranslationOf ?translation_of_uri } .
  OPTIONAL { ?subject prod:management_plan ?mps_code } .
  OPTIONAL { ?subject prod:serial_title ?serial_title } .
  OPTIONAL { ?subject dc:description ?description } .
  ?subject a ?type_uri .
  FILTER (?type_uri = prod:Article)
  OPTIONAL { ?subject prod:isbn ?isbn } .
  OPTIONAL { ?subject schema:productID ?prod_id } .
}`

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
    };
  }


  // onEditData() {
  //   const childrenLinks = this.props.childrenLinks;
  //   this.props.onChangeBlock(this.props.block, {
  //     ...this.props.data,
  //     links: childrenLinks,
  //   });
  // }

  componentDidMount() {
  }

  async handleFetch() {
    const client = new SparqlClient({ endpointUrl })
    const stream = await client.query.select(query)

    stream.on('data', row => {
      Object.entries(row).forEach(([key, value]) => {
        console.log(`${key}: ${value}`)
      })
    })

    stream.on('error', err => {
      console.error(err)
    })
  }


  render() {

    return (
      <Grid columns={1}>
        the fetcher edit

        <button onClick={() => this.handleFetch()}>Fetch</button>
      </Grid>
    );
  }
}



const mapDispatchToProps = {
  getParentFolderData,
}

export default compose(
  injectIntl,
  connect(
    state => ({
      state,
    }),
    mapDispatchToProps,
  )
)(Edit)