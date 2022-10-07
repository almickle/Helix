Rails.application.routes.draw do
  # resources :annotations, only: [:create]
  # resources :libraries, only: [:show]
  # resources :genes
  # resources :users, only: [:show, :create]

  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/me', to: 'users#show'

  get '/genelibrary', to: 'libraries#show'
  post '/addgene', to: 'genes#add_gene_to_library'
  post '/removegene', to: 'genes#remove_gene_from_library'

  post '/newannotation', to: 'annotations#create'
  post '/annotations', to: 'annotations#show_gene_annotations'

  get '/michael', to: 'users#michael'

end
