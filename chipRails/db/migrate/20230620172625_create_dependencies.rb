class CreateDependencies < ActiveRecord::Migration[7.0]
  def change
    create_table :dependencies do |t|
      t.string :bom_ref
      t.string :type
      t.string :publisher
      t.string :name
      t.string :version
      t.string :cpe
      t.string :purl
      #t.belongs_to :sbom,  foreign_key: true

      t.timestamps
    end
  end
end
