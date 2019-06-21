import React from 'react';
import { connect } from "react-redux";
import { 
    getUsers,
    getSuggestions
} from "../redux/actions/admin";
import Grid from '@material-ui/core/Grid';
import UserTable from './../components/admin/UserTable'
import SuggestionTable from './../components/admin/SuggestionTable'

  
class Admin extends React.Component{

    componentDidMount(){
        this.props.getUsers();
        this.props.getSuggestions();
    }
    render(){
        const {
            users,
            suggestions
        } = this.props;

        return (
            <Grid container spacing={4} >
                <Grid item>
                    <UserTable users={users} />
                </Grid>
                <Grid>
                    <SuggestionTable suggestions={suggestions} />
                </Grid>
            </Grid>
        )
    }
}



const mapStateToProps = state => {
    return { 
      users: state.admin.users,
      suggestions: state.admin.suggestions
    };
  };
  
  export default connect(mapStateToProps, { getUsers, getSuggestions })(Admin);
  