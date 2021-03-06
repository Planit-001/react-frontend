import React from 'react';
import { connect } from "react-redux";
import { 
    getUsers,
    getSuggestions
} from "../redux/actions/admin";
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import AppTable from './../components/AppTable';
import {readableDateTime} from './../utils/dateFuncs';

class Admin extends React.Component{

    componentDidMount(){
        this.props.getUsers();
        this.props.getSuggestions();
    }
    
    generateUserCols(user){
        return Object.keys(user).map((item) => {
            if(typeof user[item] === 'boolean'){
                return {
                    Header: item,
                    accessor: item,
                    Cell: props => String(props.value)
                }
            }else if(item === 'created_at'){
                return {
                    Header: item,
                    accessor: item,
                    Cell: props => readableDateTime(props.value)
                }
            }else{
                return {
                    Header: item,
                    accessor: item
                }
            }
        });
    }

    generateSuggestionCols(suggestions){
        return Object.keys(suggestions).map((item) => {
            if(typeof suggestions[item] === 'boolean'){
                return {
                    Header: item,
                    accessor: item,
                    Cell: props => String(props.value)
                }
            }else if(item === 'created_at'){
                return {
                    Header: item,
                    accessor: item,
                    Cell: props => readableDateTime(props.value)
                }
            }else{
                return {
                    Header: item,
                    accessor: item
                }
            }
        });
    }


    render(){
        const {
            users,
            suggestions
        } = this.props;

        return (
            <Grid container spacing={4} >
                <Grid item xs={12}>

                    <Typography variant="h5" gutterBottom component="h4">
                        Users
                    </Typography>
                    <AppTable 
                        columns={ users ? this.generateUserCols(users[0]) : []} 
                        defaultSorted={[{id: "id", desc: true}]}
                        data={users} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom component="h4">
                        Suggestions
                    </Typography>
                    <AppTable 
                        columns={ suggestions ? this.generateSuggestionCols(suggestions[0]) : []}
                        defaultSorted={[{id: "id", desc: true}]}
                        data={suggestions} />
                </Grid>
            </Grid>
        )
    }
}



const mapStateToProps = state => {
    return { 
      users: state.admin.users.items,
      suggestions: state.admin.suggestions.items
    };
  };
  
  export default connect(mapStateToProps, { getUsers, getSuggestions })(Admin);
  