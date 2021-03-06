import { connect } from "react-redux";
import { followAC, setCurrentPageAC, setUsersAC, unfollowAC, setTotalUsersCountAC,toggleIsFetchingAC } from "../../redux/usersReducer";
import * as axios from 'axios';
import { Component } from 'react';
import Users from './Users';
import Preloader from "../Common/Preloader";


class UsersContainer extends Component{
    componentDidMount(){
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
        .then(response=>{
            this.props.toggleIsFetching(false);
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount);
        })
    }
     onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
        .then(response=>{
            this.props.setUsers(response.data.items);
            this.props.toggleIsFetching(false);
        })
    }
    render(){

        return <>
                    {this.props.isFetching?<Preloader/>:null}
                    <Users totalUsersCount={this.props.totalUsersCount} 
                            pageSize={this.props.pageSize}
                            currentPage={this.props.currentPage}
                            onPageChanged={this.onPageChanged}
                            users={this.props.users}
                            unFollow={this.props.unFollow}
                            follow={this.props.follow}/>
                      
        </> 
    }
}

let mapStateToProps=(state)=>{
        return{
            users: state.usersPage.userData,
            pageSize: state.usersPage.pageSize,
            totalUsersCount: state.usersPage.totalUsersCount,
            currentPage: state.usersPage.currentPage,
            isFetching: state.usersPage.isFetching
        }
}
let mapDispatchToProps=(dispatch)=>{
        return{
            follow:(userId)=>{
                dispatch(followAC(userId))
            },
            unFollow:(userId)=>{
                dispatch(unfollowAC(userId))

            },
            setUsers:(users)=>{
                dispatch(setUsersAC(users))
            },
            setCurrentPage:(pageNumber)=>{
                dispatch(setCurrentPageAC(pageNumber))
            },
            setTotalUsersCount:(totalCount)=>{
                dispatch(setTotalUsersCountAC(totalCount))
            },
            toggleIsFetching:(isFetching)=>{
                dispatch(toggleIsFetchingAC(isFetching))
            }
        }
}

export default connect (mapStateToProps,mapDispatchToProps)(UsersContainer);