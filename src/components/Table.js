import React from 'react';
import Button from './Button';

const largeColumn = {
    width: '40%',
  };
  
  const midColumn = {
    width: '30%',
  };
  
  const smallColumn = {
    width: '10%',
  };

const isSearched = searchTerm => item => {
    item.title.toLowerCase().includes(searchTerm.toLowerCase());
    console.log("Item: ", item);
}

function Table({ list, pattern, onDismiss }) {
    console.log(list)
    return (
        <div className="table">
            {list.filter(isSearched(pattern)).map(item => 
                <div key={item.objectID} className="table-row">
                    <span style={largeColumn}>
                        <a href={item.url}>{item.title}</a>
                    </span>
                    <span style={midColumn}>
                        {item.author}
                    </span>
                    <span style={smallColumn}>
                        {item.num_comments}
                    </span>
                    <span style={smallColumn}>
                        {item.points}
                    </span>
                    <span style={smallColumn}>
                        <Button
                            onClick={() => onDismiss(item.objectID)}
                            className="button-inline"
                        >
                            Dismiss
                        </Button>
                    </span>
                </div>
            )}
        </div>   
    );
}

export default Table;