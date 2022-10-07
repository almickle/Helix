class CreateGenes < ActiveRecord::Migration[7.0]
  def change
    create_table :genes do |t|
      t.string :symbol
      t.integer :library_id
      t.timestamps
    end
  end
end
