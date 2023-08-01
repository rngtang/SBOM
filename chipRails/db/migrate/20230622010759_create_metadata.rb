class CreateMetadata < ActiveRecord::Migration[7.0]
  def change
    create_table :metadata do |t|
      t.string :timestamp
      t.string :rootNode
      t.references :sbom, null: false, foreign_key: true

      t.timestamps
    end
  end
end
