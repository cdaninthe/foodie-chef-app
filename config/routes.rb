Rails.application.routes.draw do

  resources :reviews
  resources :recipes 
  resources :bookmarks
  resources :users, only: [:index]
  
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/me', to: 'users#show'
  post '/signup', to: 'users#create'

  get '/recipes/:id/reviews', to: 'recipes#reviews'
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
