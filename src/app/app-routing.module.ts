import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
// import { APIService } from './Services/api.service';


const routes: Routes = [
  { path: '', component: MovieListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  // public movieList:any =[];

  // constructor(public apiservice:APIService) {
  //   this.getMoviesList();
  //  }

  //  public getMoviesList(){

  //   let getMoviesUrl = 'http://localhost:4200/assets/JSONFiles/imdb.json'
  //   this.apiservice.getData(getMoviesUrl).subscribe(
  //     response => {
  //       this.movieList=response.data;
  //       console.log(this.movieList)
  //     }
  //   )
  //  }

 }
