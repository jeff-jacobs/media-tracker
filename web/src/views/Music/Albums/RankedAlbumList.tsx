import axios from 'axios';
import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Album, RankedAlbumList } from './interfaces';

interface Props {
  listId: number;
}

interface RankedAlbum {
  album: Album;
  id: number;
  order: number;
  rank: 'A' | 'B' | 'C' | 'D' | 'F' | undefined;
}

type RankedLists = {
  'none': RankedAlbum[];
  'A': RankedAlbum[];
  'B': RankedAlbum[];
  'C': RankedAlbum[];
  'D': RankedAlbum[];
  'F': RankedAlbum[];
}

const RankedAlbumListDetail: React.FC<Props> = ({
  listId
}):React.ReactElement => {

  const [listName, setListName] = React.useState<RankedAlbumList>();
  const [lists, setLists] = React.useState<RankedLists>({
    'none': [],
    'A': [],
    'B': [],
    'C': [],
    'D': [],
    'F': [],
  })

  const sortLists = (rankedAlbums: RankedAlbum[]): RankedLists => {
    return rankedAlbums.reduce((accumulatedLists: RankedLists, album: RankedAlbum) => {
      accumulatedLists[album.rank || 'none'] = [
        ...accumulatedLists[album.rank || 'none'],
        album,
      ];
      return accumulatedLists;
    }, {
      'none': [],
      'A': [],
      'B': [],
      'C': [],
      'D': [],
      'F': [],
    });
  }

  const handleOnDragEnd = (result: DropResult) => {
    const album = lists[result.source.droppableId as keyof RankedLists].find((rankedAlbum: RankedAlbum) => rankedAlbum.id.toString() === result.draggableId);
    if (result.destination && result.destination.droppableId !== result.source.droppableId) {
      setLists({
        ...lists,
        [result.source.droppableId]: (lists[result.source.droppableId as keyof RankedLists]).filter((rankedAlbum: RankedAlbum) => rankedAlbum.id.toString() !== result.draggableId),
        [result.destination.droppableId]: [
          ...lists[result.destination.droppableId as keyof RankedLists],
          album,
        ]
      })
    }
  }

  React.useEffect(() => {
    axios.get(`http://localhost:8000/music/ranked-album-lists/${listId}`)
    .then(res => {
      setListName(res.data.name);
      setLists(sortLists(res.data.albums));
    })
    .catch((err) => console.log(err));
  }, [listId])

  return (
    <>
      {listName}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {Object.entries(lists).map(([key, value]) => (
          <div key={key}>
            {key}: {' '}
            <Droppable droppableId={key}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                >
                  {
                    value.map((rankedAlbum: RankedAlbum, index: number) => (
                      <Draggable
                        key={rankedAlbum.id}
                        draggableId={rankedAlbum.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {rankedAlbum.album.name}
                          </div>
                        )}
                      </Draggable>
                    ))
                  }
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          
        ))}
      </DragDropContext>
    </>
  )
}

export default RankedAlbumListDetail;