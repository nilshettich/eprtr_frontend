const articlesQuery = `PREFIX eea: <http://www.eea.europa.eu/ontologies.rdf#>
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


const Fetcher = {
  title: 'Articles Fetcher',

  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['endpoint', 'request'],
    },
  ],

  properties: {
    endpoint: {
      type: 'string',
      title: 'Endpoint',
    },
    request: {
      title: 'Query Request',
      choices: [
        [articlesQuery, 'Fetch EEA Articles']
      ]
    }

  },

  required: ['endpoint', 'request'],
};

export default Fetcher;