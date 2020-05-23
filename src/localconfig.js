
import TabsView from '~/components/theme/View/TabsView';
import RedirectView from '~/components/theme/View/RedirectView';
import TabsChildView from '~/components/theme/View/TabsChildView';

import DetailedLinkView from '~/components/manage/Blocks/DetailedLink/View';
import DetailedLinkEdit from '~/components/manage/Blocks/DetailedLink/Edit';

import FolderContentsBlockView from '~/components/manage/Blocks/FolderContentsBlock/View';
import FolderContentsBlockEdit from '~/components/manage/Blocks/FolderContentsBlock/Edit';

import ArticlesListView from '~/components/manage/Blocks/ArticlesList/View';
import ArticlesListEdit from '~/components/manage/Blocks/ArticlesList/Edit';

import ChildrenLinksView from '~/components/manage/Blocks/ChildrenLinks/View'
import ChildrenLinksEdit from '~/components/manage/Blocks/ChildrenLinks/Edit'

import ArticlesFetcherEdit from '~/components/manage/Blocks/ArticlesFetcher/Edit'
import ArticlesFetcherView from '~/components/manage/Blocks/ArticlesFetcher/View'

const applyConfig = config => {
  console.log('config', config)
  config.views = {
    ...config.views,
    layoutViews: {
      ...config.views.layoutViews,
      tabs_view: TabsView,
      tabs_child_view: TabsChildView,

      redirect_view: RedirectView,

    },
  };

  // console.log('children list edit', ChildrenListEdit)

  config.blocks.blocksConfig.detailed_link = {
    id: 'detailed_link',
    group: 'custom_addons',
    title: 'Detailed Link',
    view: DetailedLinkView,
    edit: DetailedLinkEdit,
    icon: config.blocks.blocksConfig.text.icon,
  };

  config.blocks.blocksConfig.articles_fetcher = {
    id: 'articles_fetcher',
    group: 'custom_addons',
    title: 'Articles Fetcher',
    view: ArticlesFetcherView,
    edit: ArticlesFetcherEdit,
    icon: config.blocks.blocksConfig.text.icon,
  };


  config.blocks.blocksConfig.folder_contents = {
    id: 'folder_contents',
    group: 'custom_addons',
    title: 'Folder Contents',
    view: FolderContentsBlockView,
    edit: FolderContentsBlockEdit,
    icon: config.blocks.blocksConfig.text.icon,
  };

  config.blocks.blocksConfig.articles_list = {
    id: 'articles_list',
    group: 'custom_addons',
    title: 'Articles List',
    view: ArticlesListView,
    edit: ArticlesListEdit,
    icon: config.blocks.blocksConfig.text.icon,
  };

  config.blocks.blocksConfig.children_links = {
    id: 'children_links',
    group: 'custom_addons',
    title: 'Children Links',
    view: ChildrenLinksView,
    edit: ChildrenLinksEdit,
    icon: config.blocks.blocksConfig.text.icon,
  };
  return config;
}

export default applyConfig