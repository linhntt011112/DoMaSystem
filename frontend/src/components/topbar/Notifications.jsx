import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';

export default function NotificationList(props) {
    const {all_data} = props;

    const show_data = (data) =>{
        return data["template"].replace("{{actor_id}}", data["{{actor_id}}"]). replace("{{entity_id}}", data["{{entity_id}}"])
    }

  return props.trigger ? (
    <>
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          position: "relative"
        }}
      >
          {all_data.map((item) => {
                                
              // return (<MenuItem value={item.id} >{item.name}</MenuItem> )
              return (
                  <>
                  <ListItem  key={item["id"]}>
                      {/* <ListItemAvatar>
                      <Avatar>
                          <ImageIcon />
                      </Avatar>
                      </ListItemAvatar> */}
                      <ListItemText primary={show_data(item)}/>
                  </ListItem>
                  <Divider variant="inset" component="li" /></>
              )
          })}
      </List>
    </>

    // <>
    //     <ul>
    //         {all_data.map((item) => {
                                    
    //                     // return (<MenuItem value={item.id} >{item.name}</MenuItem> )
    //                     return (
    //                         <li>{show_data(item)}</li>
                            
    //                     );
    //                 })}
    // </ul>
    // </>
    
  ): "";
}
