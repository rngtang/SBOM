class CreateSboms < ActiveRecord::Migration[7.0]
  def change
    create_table :sboms do |t|
      t.string :bomFormat
      t.string :specVersion
      t.string :serialNumber
      t.integer :version

      t.timestamps
    end
  end
end
