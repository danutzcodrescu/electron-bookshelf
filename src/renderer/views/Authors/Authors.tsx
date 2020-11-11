import { Create } from 'components/Create/Create';
import { offlineSearch } from 'components/ElectronNetworkStatus/utils/offlineSearch';
import { ExportToPDFIcon } from 'components/ExportToPDFIcon/ExportToPDFIcon';
import * as React from 'react';
import { AuthorDetailsFragment } from 'src/renderer/generated/graphql';
import { Search } from 'views/Books/components/Search';
import { AuthorsList } from './components/AuthorsList';
import { useAuthors, useSearchForAuthors } from './queries/queries';

export function Authors() {
  const [authors, setAuthors] = React.useState<AuthorDetailsFragment[]>([]);
  const { data, isFetching } = useAuthors();
  const [mutate, { data: searchResults, isLoading, error: searchError }] = useSearchForAuthors(offlineSearch);

  function reset() {
    setAuthors((data as any) || []);
  }

  React.useEffect(() => {
    setAuthors((data as any) || []);
  }, [data]);

  React.useEffect(() => {
    if (searchResults) {
      setAuthors(searchResults || []);
    }
  }, [searchResults]);
  return (
    <>
      <Search onSearch={mutate} clear={reset} placeholder="Search for authors">
        <Create to="authors" title="New author" />
        <ExportToPDFIcon data={authors} />
      </Search>
      {isFetching ? <p>loading</p> : null}
      {!isFetching && data ? <AuthorsList authors={authors} /> : null}
    </>
  );
}
