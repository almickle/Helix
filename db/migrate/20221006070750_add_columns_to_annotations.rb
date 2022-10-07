class AddColumnsToAnnotations < ActiveRecord::Migration[7.0]
  def change
    add_column :annotations, :transcript, :integer
    add_column :annotations, :protein, :boolean
  end
end
