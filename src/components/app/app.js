import React, {Component} from 'react'
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";
import TegList from '../teg-list';
import './app.css'


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idElenetForEdit:undefined,
            editMode:false,
            text:'',
            textToFilter: '',
            filteringByButtons: 'all',
            allPosts: [],
            allTegs:[],
              }
        this.maxid = 4;
    }

    componentDidMount(){
        fetch(' http://localhost:3000/notes')
        .then(res => res.json())
        .then(
            (notes) => {

                this.setState({
                    allPosts: notes,
                    loading: false
                });

            },
            (error) => {
                this.setState({
                    allPosts: ['error loading contacts'],
                    loading: false,

                });
            }
        ) 
        fetch('http://localhost:3000/tegs')
        .then(res => res.json())
        .then(
            (tegs) => {

                this.setState({
                    allTegs: tegs,
                    loading: false
                });

            },
            (error) => {
                this.setState({
                    tegs: ['error loading contacts'],
                    loading: false,

                });
            }
        )               
    }

    onValueChangeText = (text) => {
        this.setState({text:text})
    }

    onSubmit =(event) => {
        event.preventDefault();

        if(this.state.editMode === true && this.state.text.trim()){
            this.onToggleLabel(this.props.idElenetForEdit);
            this.setState({
                text:'',
                editMode:false,
                idElenetForEdit:undefined,
            })
        }else  if
                (this.state.editMode === false && this.state.text.trim()){
                    if(this.state.text.includes("#")){                    
                        this.checkTeg(this.state.text)
                    }
                    else {
                        this.addItem(this.state.text);
                        this.setState({
                        text: '',
                        })
                    }
                

        }
    };

      checkTeg = (stringToCheck) => {
        let mas = stringToCheck.split(' ');
        for(let val of mas){
            if(val.startsWith('#') && val.length>1){
                this.addTeg(val.toString())
            }
            }
        return (
                 this.addItem(this.state.text),
                this.setState({
                text: '',
                  })
        )
     };


  

    addTeg = (body) => {
        const newTeg = {
            teg: body,
            id: this.maxid++
        }
        this.setState(({allTegs}) => {
            const newArr = [...allTegs, newTeg];
            return {
                allTegs: newArr,
            }
        })
    };

    
    onToggleLabel = () => {
       
        this.setState(({allPosts}) => {
            const postIndex = allPosts.findIndex(elem => elem.id === this.state.idElenetForEdit);

            const postLabel = allPosts[postIndex];
            const newItem = {...postLabel, label: this.state.text};
     
            const newArrPosts = [...allPosts.slice(0, postIndex), newItem, ...allPosts.slice(postIndex + 1)]
            return {
                allPosts: newArrPosts
            }
        })
    };

    onEditStateText = (id) => {
       
        this.setState(({allPosts})=>{
        const postIndex = allPosts.findIndex(elem => elem.id === id);
        return{
            idElenetForEdit:id,
            text:allPosts[postIndex].label,
            editMode:true
            }    
        })
 
    };


    deleteTeg = (id) => {
        this.setState(({allTegs}) => {
            const postIndex = allTegs.findIndex(elem => elem.id === id);

            const newTegs = [...allTegs.slice(0, postIndex), ...allTegs.slice(postIndex + 1)];

            return {
                allTegs: newTegs,
                textToFilter: ''
            }
        });
    };

    deleteItem = (id) => {
        this.setState(({allPosts}) => {
            const postIndex = allPosts.findIndex(elem => elem.id === id);

            const newPosts = [...allPosts.slice(0, postIndex), ...allPosts.slice(postIndex + 1)];

            return {
                allPosts: newPosts,
                textToFilter: ''
            }
        });
    };



    addItem = (body) => {
        const newPost = {
            label: body,
            important: false,
            id: this.maxid++
        }
        this.setState(({allPosts}) => {
            const newArr = [...allPosts, newPost];
            return {
                allPosts: newArr,
            }
        })
    };

    onToggleImportant = (id) => {
        this.setState(({allPosts}) => {
            const postIndex = allPosts.findIndex(elem => elem.id === id);
         
            const postImportant = allPosts[postIndex];
            const newItem = {...postImportant, important: !postImportant.important};
            const newArrPosts = [...allPosts.slice(0, postIndex), newItem, ...allPosts.slice(postIndex + 1)]
            return {
                allPosts: newArrPosts
            }
        })
    };  

    onToggleLiked = (postId) => {
        this.setState(({allPosts}) => {
            const postIndex = allPosts.findIndex(elem => elem.id === postId);

            const postLiked = allPosts[postIndex];
            const newItem = {...postLiked, like: !postLiked.like};
           
            const newArrPosts = [...allPosts.slice(0, postIndex), newItem, ...allPosts.slice(postIndex + 1)]
            return {
                allPosts: newArrPosts
            }
        })
    };
    onUpdateSearch = (textToFilter) => {
        this.setState({textToFilter})
    };

    searchPost = (allPosts, textToFilter) => {
        if (textToFilter.length === 0) {
            return allPosts
        }
        return allPosts.filter((post) => {
            return post.label.indexOf(textToFilter) > -1
        });
    };
   
    filterPost = (allPosts, filter) => {
        if (filter === 'like') {
          
            return allPosts.filter(item => item.like)
            } else if(filter === 'teg'){

                let mas = this.state.allTegs.map(item => item.teg);

                console.log('mas',mas)

                return allPosts.filter((item) => {
                   for(let everyTeg of mas){
                       console.log(everyTeg)
                       if(item.label.includes(everyTeg)){
                           return item.label
                       }
                   }
                }
                )
               } else return allPosts
    };  
    
    onFilterSelect = (filteringByButtons) => {
        this.setState({filteringByButtons})
    };

    render() {
        

        const {allPosts, textToFilter, filteringByButtons} = this.state;
        const liked = allPosts.filter(item => item.like).length;
        const allPost = allPosts.length;

        const visiblePosts = this.filterPost(this.searchPost(allPosts, textToFilter), filteringByButtons);

        return (
        <div className='app'>
            <AppHeader
                like={liked}
                allPosts={allPost}/>
            <div className='search-panel d-flex'>
                <SearchPanel
                    onUpdateSearch={this.onUpdateSearch}/>
                <PostStatusFilter
                    filter={filteringByButtons}
                    onFilterSelect={this.onFilterSelect}/>
            </div> 
            <PostAddForm className='postAddFrom'
               onSubmit={this.onSubmit}
               text={this.state.text}
               onValueChangeText={this.onValueChangeText}
           />
           <TegList
           deleteTeg={this.deleteTeg}
           allTegs={this.state.allTegs}/>
          <PostList
            onEdit={this.onEditStateText}
            onToggleImportant={this.onToggleImportant}   
            onToggleLiked={this.onToggleLiked}
            onDelete={this.deleteItem}
            allPosts={visiblePosts}/>
        
        </div>)
    }
};
