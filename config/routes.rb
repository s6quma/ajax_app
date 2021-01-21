Rails.application.routes.draw do
  #HTTPメソッド 'URIパターン', to: 'コントローラー名#アクション名'
  root to: 'posts#index'
  post 'posts', to:'posts#create'
  get 'post/:id', to: 'post#checked'
  end

