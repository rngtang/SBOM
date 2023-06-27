class CreateVulnerabilities < ActiveRecord::Migration[7.0]
  def change
    create_table :vulnerabilities do |t|
      t.string :bom_ref
      t.string :vulnID
      t.string :description
      t.string :detail
      t.string :recommendation
      t.string :created
      t.string :published
      t.string :updated
      t.references :sbom, null: false, foreign_key: true

      t.timestamps
    end
  end
end
