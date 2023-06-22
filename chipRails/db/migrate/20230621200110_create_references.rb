class CreateReferences < ActiveRecord::Migration[7.0]
  def change
    create_table :references do |t|
      t.string :name
      t.string :details
      t.integer :age

      t.timestamps
    end
  end
end
