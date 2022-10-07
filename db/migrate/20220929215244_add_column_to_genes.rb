class AddColumnToGenes < ActiveRecord::Migration[7.0]
  def change
    add_column :genes, :taxon, :string
  end
end
