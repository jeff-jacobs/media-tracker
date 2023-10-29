import React from "react";
import axios from "axios";
import ViewHeader from "src/components/ViewHeader";

const SetlistFM: React.FC = ():React.ReactElement => {

  const [user, setUser] = React.useState<string>('Jeffer');
  const [userInput, setUserInput] = React.useState<string>(user);
  
  const [setlists, setSetlists] = React.useState<any[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(1);
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  React.useEffect(() => {
    axios.get(`http://localhost:8000/api/music/setlistfm/attended/${user}/`, {
      params: {
        page
      }
    })
    .then(res => {
      setErrorMessage('');
      if (res.data.code === 404) {
        setErrorMessage(res.data.message);
        setSetlists([]);
        setTotalPages(1);
        return
      }
      setSetlists(res.data.setlist);
      setTotalPages(Math.floor(res.data.total / res.data.itemsPerPage));
    })
    .catch((err) => {
      console.log('error')
      console.log(err);
    });
  }, [page, user]);

  const handleUserInputChanged = (event: any) => {
    setUserInput(event.target.value);
  }

  const handleUserInputKeydown = (event: any) => {
    if (event.keyCode === 13) {
      handleUserSubmitted();
    }
  }

  const handleUserSubmitted = () => {
    setUser(userInput);
  }

  const handlePageFirst = () => {
    if (page > 1) {
      setPage(1);
    }
  }

  const handlePagePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  const handlePageNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  const handlePageLast = () => {
    if (page < totalPages) {
      setPage(totalPages);
    }
  }

  return (
    <>
      <ViewHeader>Setlist.fm</ViewHeader>
      <h2>User</h2>
        <input
          type="text"
          name="user"
          value={userInput}
          onChange={handleUserInputChanged}
          onKeyDown={handleUserInputKeydown}
        />
        <button onClick={handleUserSubmitted}>Change User</button>
        {errorMessage && <div>{errorMessage}</div>}
      <h2>Shows</h2>
      <ul>
        {setlists.length ? setlists?.map(setlist =>
          <li key={setlist.id}>
            <a href={setlist.url} target="_blank" rel="noreferrer">
              {setlist.eventDate} - {setlist.venue.name} - {setlist.artist.name}
            </a>
          </li>
        ) : (<li>No setlists available for {user}.</li>)}
      </ul>
      {!!setlists.length && 
        <div>
          <span style={page === 1 ? { color: 'silver' } : undefined}>
            <span onClick={handlePageFirst}>First</span>
            &nbsp;&nbsp;
            <span onClick={handlePagePrev}>Prev</span>
          </span>
          &nbsp;&nbsp;
          <span>{page}/{totalPages}</span>
          &nbsp;&nbsp;
          <span style={page === totalPages ? { color: 'silver' } : undefined}>
            <span onClick={handlePageNext}>Next</span>
            &nbsp;&nbsp;
            <span onClick={handlePageLast}>Last</span>
          </span>
        </div>
        }
    </>
  )
}

export default SetlistFM;