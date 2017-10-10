import * as React from 'react'
const isBrowser = typeof window !== 'undefined'
const SortableTree = isBrowser ? require('react-sortable-tree').default : undefined

// Styles
const styled = require('styled-components').default

const Containerz = styled.div`
  text-align: center;
  margin: 0;
  padding: 0;
  height: 500px;
  display: block;
`

interface ISearchProps {
  searchString: string;
  searchFocusIndex: number;
  searchFoundCount: number;
  treeData: any;
}

export default class Tree extends React.Component {
  public state: ISearchProps
  constructor(props: ISearchProps) {
    super(props);

    this.state = {
      searchString: '',
      searchFocusIndex: 0,
      searchFoundCount: null,
      treeData: [
        {
          title: 'jamplay.world',
          children: [
            {
              title: 'NAP',
              url: 'http://10.0.0.205:3000/ping',
              children: [
                { title: 'MongoDB' },
                { title: 'MongoDB' },
                { title: 'MongoDB' },
              ],
              resources: {
                memory: {
                  rss: 133488640,
                  heapTotal: 68210688,
                  heapUsed: 61237552,
                  external: 36329527
                }
              }
            },
            {
              title: 'Web',
              url: 'http://10.0.0.204:8080/ping',
              children: [
                { title: 'NodeJS 8.5.0' }
              ],
              resources: {
                memory: {
                  rss: 99901440,
                  heapTotal: 63492096,
                  heapUsed: 57281976,
                  external: 287517
                },
              }
            }
          ],
        },
      ],
    } as ISearchProps
  }

  public render() {
    if (!(process as any).browser) {
      return <div />
    }

    const { searchString, searchFocusIndex, searchFoundCount } = this.state as ISearchProps

    // Case insensitive search of `node.title`
    const customSearchMethod = ({ node, searchQuery }) =>
      searchQuery &&
      node.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;

    const selectPrevMatch = () =>
      this.setState({
        searchFocusIndex:
        searchFocusIndex !== null
          ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
          : searchFoundCount - 1,
      });

    const selectNextMatch = () =>
      this.setState({
        searchFocusIndex:
        searchFocusIndex !== null
          ? (searchFocusIndex + 1) % searchFoundCount
          : 0,
      });

    const onSearchClick = (event: any) => event.preventDefault();

    return (
      <div>
        <h2>Jamplay.world services</h2>
        <form
          style={{ display: 'inline-block' }}
          onSubmit={onSearchClick}
        >
          <input
            id='find-box'
            type='text'
            placeholder='Search...'
            style={{ fontSize: '1rem' }}
            value={searchString}
            onChange={this.onChangeSearch()}
          />

          <button
            type='button'
            disabled={!searchFoundCount}
            onClick={selectPrevMatch}
          >
            &lt;
          </button>

          <button
            type='submit'
            disabled={!searchFoundCount}
            onClick={selectNextMatch}
          >
            &gt;
          </button>

          <span>
            &nbsp;
            {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
            &nbsp;/&nbsp;
            {searchFoundCount || 0}
          </span>
        </form>

        <Containerz>
          <SortableTree
            treeData={this.state.treeData}
            onChange={this.onChangeSortableTree()}
            //
            // Custom comparison for matching during search.
            // This is optional, and defaults to a case sensitive search of
            // the title and subtitle values.
            // see `defaultSearchMethod` in https://github.com/fritz-c/react-sortable-tree/blob/master/src/utils/default-handlers.js
            searchMethod={customSearchMethod}
            //
            // The query string used in the search. This is required for searching.
            searchQuery={searchString}
            //
            // When matches are found, this property lets you highlight a specific
            // match and scroll to it. This is optional.
            searchFocusOffset={searchFocusIndex}
            //
            // This callback returns the matches from the search,
            // including their `node`s, `treeIndex`es, and `path`s
            // Here I just use it to note how many matches were found.
            // This is optional, but without it, the only thing searches
            // do natively is outline the matching nodes.
            searchFinishCallback={this.searchFinishCallback(searchFocusIndex)}
          />
        </Containerz>
      </div>
    );
  }

  private onChangeSearch(): (event: React.ChangeEvent<HTMLInputElement>) => void {
    return (event: any) => this.setState({ searchString: event.target.value });
  }

  private onChangeSortableTree() {
    return (treeData: any) => this.setState({ treeData });
  }

  private searchFinishCallback(searchFocusIndex: any) {
    return (matches) => this.setState({
      searchFoundCount: matches.length,
      searchFocusIndex: matches.length > 0 ? searchFocusIndex % matches.length : 0,
    });
  }
}
