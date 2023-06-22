class CreateReferences < ActiveRecord::Migration[7.0]
  def change
    create_table :references do |t|
      t.string :name
      t.integer :age
      t.string :description

      t.timestamps
    end
  end
end
