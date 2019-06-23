import React from 'react';
import { connect } from "react-redux";
import { 
    getUsers,
    getSuggestions
} from "../redux/actions/admin";
import Grid from '@material-ui/core/Grid';
import UserTable from './../components/admin/UserTable'
import SuggestionTable from './../components/admin/SuggestionTable'
import Typography from '@material-ui/core/Typography';
  
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
                    <Typography variant="h5" gutterBottom component="h4">
                        Users
                    </Typography>
                    <UserTable users={users} />
                </Grid>
                <Grid>
                    <Typography variant="h5" gutterBottom component="h4">
                        Suggestions
                    </Typography>
                    <SuggestionTable suggestions={suggestions} />
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
  