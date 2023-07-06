class Createdependencyren < ActiveRecord::Migration[7.0]
  def change
    create_table :dependencyren do |t|
      t.string :ref
      t.text :dependsOn
      t.references :sbom, null: false, foreign_key: true

      t.timestamps
    end
  end
end
