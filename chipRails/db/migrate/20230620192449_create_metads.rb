class CreateMetads < ActiveRecord::Migration[7.0]
  def change
    create_table :metads do |t|
      t.string :timestamp
      #t.belongs_to :sbom

      t.timestamps
    end
  end
end
