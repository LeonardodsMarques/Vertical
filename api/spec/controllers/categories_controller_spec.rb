require 'rails_helper'

RSpec.describe CategoriesController, type: :controller do
    describe 'GET #index' do
    let!(:category) { Category.create(title: "titulo original", description: "") }
        it 'returns a successful response' do
            get :index
            expect(response).to be_successful
        end

        it 'returns all categories' do
            get :index
            expect(JSON.parse(response.body).size).to eq(1)
        end
    end

    describe 'POST #create' do
        it 'creates a new category' do
            post :create, params: { category: { name: 'New Category', description: 'Some Description' } }
            expect(Category.count).to eq(1)
        end
    end

    describe 'PUT #update' do
    let!(:category) { Category.create(title: "titulo original", description: "") }
        it 'updates a category' do
            put :update, params: { id: category.id, title: 'New Title'  }
            category.reload
            expect(category.title).to eq('New Title')
        end
        it 'returns a successful response' do
            expect(response).to be_successful
        end
        it 'does not create a new category' do
            expect(Category.count).to eq(1)
        end
    end

    describe 'DELETE #destroy' do
    let!(:category) { Category.create(title: "titulo original", description: "", active: true) }
        it 'updates the category to inactive' do
            delete :destroy, params: { id: category.id }
            category.reload
            expect(category.active).to eq(false)
        end
    
        it 'returns a successful response' do
            delete :destroy, params: { id: category.id }
            expect(response).to be_successful
        end
    end
end