import React, { Component, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getParentFolderData } from '~/actions';
import _ from 'lodash'
import { SidebarPortal } from '@plone/volto/components'; // EditBlock
import { BlockEditForm } from 'volto-addons/BlockForm';

import schema from './schema';


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
?published
?translation_of_uri
?description
?type_uri
WHERE {
  ?subject a prod:Article .
  ?subject dc:title ?title .
  ?subject dc:issued ?published .
  OPTIONAL { ?subject eea:isTranslationOf ?translation_of_uri } .
  OPTIONAL { ?subject dc:description ?description } .
  ?subject a ?type_uri .
  FILTER (?type_uri = prod:Article)
}`

const Edit = (props) => {

  useEffect(() => {
    //do stuff on data change


  }, [props.data])

  const getItems = () => {
    if (props.data.endpoint && props.data.request) {
      handleFetch()
    } else { console.log('Nothing to query. No query.') }
  }

  const handleFetch = async () => {
    const endpoint = props.data.endpoint
    const request = props.data.request


    const client = new SparqlClient({ endpointUrl })
    const stream = await client.query.select(query)

    var fullItems = []

    stream.on('data', row => {
      fullItems.push(row)
    })

    console.log(fullItems)

    stream.on('error', err => {
      console.error(err)
    })
  }

  return (
    <Grid columns={1}>
      the fetcher edit

      <button onClick={() => getItems()}>Fetch</button>
      <SidebarPortal selected={props.selected}>
        <BlockEditForm
          schema={schema}
          title={schema.title}
          onChangeField={(id, value) => {
            props.onChangeBlock(props.block, {
              ...props.data,
              [id]: value,
            });
          }}
          formData={props.data}
          block={props.block}
        />
      </SidebarPortal>
    </Grid>
  );
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