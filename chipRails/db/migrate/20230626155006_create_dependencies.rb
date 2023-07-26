class CreateDependencies < ActiveRecord::Migration[7.0]
  def change
    create_table :dependencies do |t|
      t.string :ref
      t.text :dependsOn
      t.references :sbom, null: false, foreign_key: true
      t.references :sbom_component, foreign_key: true

      t.timestamps
    end
  end
end
