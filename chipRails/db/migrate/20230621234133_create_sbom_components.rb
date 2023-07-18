class CreateSbomComponents < ActiveRecord::Migration[7.0]
  def change
    create_table :sbom_components do |t|
      t.string :bom_ref
      t.string :group
      t.string :name
      t.string :version
      t.string :purl
      t.references :sbom, null: false, foreign_key: true

      t.timestamps
    end
  end
end
