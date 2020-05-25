import React, { Component, useEffect, useState } from 'react';
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

const Edit = (props) => {

  const [articleList, setArticleList] = useState("")

  useEffect(() => {
    if (props.data.endpoint && props.data.request && articleList !== props.data.articles) {
      handleFetch()
    }
  }, [props.data])


  const handleFetch = async () => {
    const endpointUrl = props.data.endpoint
    const request = props.data.request

    const client = new SparqlClient({ endpointUrl })
    const stream = await client.query.select(request)

    var fullItems = []

    stream.on('data', row => {
      fullItems.push(row)
    })

    console.log(fullItems)

    setArticleList(fullItems)

    props.onChangeBlock(props.block, {
      ...props.data,
      articles: fullItems
    });

    stream.on('error', err => {
      console.error(err)
    })
  }

  const hasQueryData = props.data.endpoint && props.data.request

  const articles = props.data.articles ? props.data.articles : ''

  return (
    <Grid columns={1}>
      {hasQueryData && !articles &&
        <p>Loading..</p>
      }
      {hasQueryData && articles &&
        articles.slice(0, 10).map(article =>
          <div className="article-list-row">
            <img className="article-img" src={`https://readreidread.files.wordpress.com/2011/09/yellow_tree1.jpg?w=998&h=624`} />
            <Grid.Column>
              <p className="article-title">
                {article.title.value}</p>
              <p class="article-date">{article.published.value}</p>
              <p className="article-description">{article.description.value}</p>
              <a className="read-article" target="_blank" href={article.uri.value}>
                READ ARTICLE
              </a>
            </Grid.Column>
          </div>
        )
      }
      {!hasQueryData &&
        <p>Use Sidebar to set Endpoint and Query Data.</p>
      }
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