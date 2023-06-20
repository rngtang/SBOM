class CreateComponents < ActiveRecord::Migration[7.0]
  def change
    create_table :components do |t|
      t.string :bom_ref
      t.string :type
      t.string :name
      t.string :version
      #t.belongs_to :metad, foreign_key: true

      t.timestamps
    end
  end
end
