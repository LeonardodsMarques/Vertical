class CreateCategoryTable < ActiveRecord::Migration[7.1]
  def change
    create_table :categories do |t|
      t.string :title
      t.string :description

      t.timestamps
    end
  end
end
