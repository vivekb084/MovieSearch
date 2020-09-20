import { Component, OnInit } from '@angular/core';
import { APIService } from '../Services/api.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  public movieList:any =[];
  public sortByOptions = [];
  public sortbyModel = ''
  public search =''
  public origMovieList:any=[]
  public GenereOptions =[]
  public genreModel = [];


  constructor(public apiservice:APIService) {

   }

  ngOnInit(): void {
    this.getMoviesList();
  }

   public getMoviesList(){
    let getMoviesUrl = '/assets/JSONFiles/imdb.json'
    this.apiservice.getData(getMoviesUrl).subscribe(
      response => {
        this.movieList=response;
        this.restructureData();
        this.getSortByOptions()
        this.getGenreOptions();
        this.origMovieList =this.movieList
      }
    )
   }

   public restructureData(){
     for(let i=0;i<this.movieList.length;i++){
        let newObj ={};
        for(let objectKey in this.movieList[i]){
          if(objectKey=='99popularity'){
            newObj['Popularity99']=this.movieList[i][objectKey].toString();
          }
          else{
            newObj[objectKey]=this.movieList[i][objectKey];
          }
      }
      this.movieList[i]=newObj;
     }
   }

   public getSortByOptions(){
     let checkAdded ={}
      for(let i=0;i<this.movieList.length;i++){
        for(let objectKey in this.movieList[i]){
          if((typeof this.movieList[i][objectKey])=='string'||(typeof this.movieList[i][objectKey])=='number'){
            if(!checkAdded[objectKey]){
              this.sortByOptions=this.sortByOptions.concat(objectKey)
              checkAdded[objectKey]=true;
            }
          }
        }
      }
      this.sortByOptions.sort()
   }

   public getGenreOptions(){
     let checkAdded = {};
     for(let i=0;i<this.movieList.length;i++){
      for(let j=0;j<this.movieList[i].genre.length;j++){
        let genreValue = this.movieList[i].genre[j].trim()
        if(!checkAdded[genreValue]){
          checkAdded[genreValue]=true;
          this.GenereOptions=this.GenereOptions.concat(genreValue)
        }
      }
     }
     this.GenereOptions.sort()
   }

   public sortList(){
     let sortModel = this.sortbyModel
      this.movieList.sort(compare)
      function compare(a,b){
        let firstkey=a[sortModel],secondkey=b[sortModel];
        if(isNaN(a[sortModel])){
          firstkey=a[sortModel].toUpperCase();
          secondkey=b[sortModel].toUpperCase();
          if ( firstkey < secondkey ){
            return -1;
          }
          if ( firstkey > secondkey ){
            return 1;
          }
          return 0;
        }
        else{
          if ( firstkey > secondkey ){
            return -1;
          }
          if ( firstkey < secondkey ){
            return 1;
          }
          return 0;
        }
        
      }
   }


  public searchMovies(){
     let newList =[]
     this.movieList=this.origMovieList;

     if(this.search){
      for(let i=0;i<this.movieList.length;i++){
        if((this.movieList[i].director.toLowerCase()).indexOf(this.search.toLowerCase()) >-1 || (this.movieList[i].name.toLowerCase()).indexOf(this.search.toLowerCase()) >-1 ){
          newList.push(this.movieList[i]);
        }
      }
      this.movieList=newList;
    }
  }

  public filterlist(){
    let newFilterList = []
    this.movieList=this.origMovieList;

    for(let i=0;i<this.movieList.length;i++){
      let genreFound=false;
      for(let j=0;j<this.genreModel.length;j++){
        genreFound=false;
        for(let k=0;k<this.movieList[i].genre.length;k++){
          if(this.movieList[i].genre[k].trim().toLowerCase()==this.genreModel[j].trim().toLowerCase()){
            genreFound=true;
          }
        }
        if(!genreFound){
          break;
        }
      }
      if(genreFound){
        newFilterList.push(this.movieList[i])
      }
    }

    this.movieList=newFilterList
  }

}
