class CreateAnnotations < ActiveRecord::Migration[7.0]
  def change
    create_table :annotations do |t|
      t.integer :gene_id
      t.integer :begin
      t.integer :end
      t.string :title
      t.string :body

      t.timestamps
    end
  end
end
