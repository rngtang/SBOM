class CreateSubComponents < ActiveRecord::Migration[7.0]
  def change
    create_table :sub_components do |t|
      t.string :bom-ref
      t.string :type
      t.string :publisher
      t.string :name
      t.string :version
      t.string :cpe
      t.string :purl
      t.references :dependency, null: false, foreign_key: true


      t.timestamps
    end
  end
end
